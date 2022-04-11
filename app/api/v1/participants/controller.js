const Participant = require("./model");
const Event = require("../events/model");
const Payment = require("../payments/model");
const Transaction = require("../transactions/model");
const { StatusCodes } = require("http-status-codes");

const { createJWT, createTokenUser } = require("../../../utils");
const CustomAPI = require("../../../errors");

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const result = new Participant({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await result.save();

    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new customAPI.BadRequestError("please provide email and password");
    }

    const result = await Participant.findOne({ email: email });

    if (!result) {
      throw new customAPI.UnauthorizedError("invalid credentials");
    }

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new customAPI.UnauthorizedError("no match password");
    }

    const token = createJWT({ payload: createTokenUser(result) });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

const landingPage = async (req, res, next) => {
  try {
    const result = await Event.find({ status: true })
      .select("_id title date price category venueName cover")
      .populate({ path: "category", select: "_id name" })
      .limit(4);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const detailPage = async (req, res, next) => {
  try {
    const { id: detailPageId } = req.params;

    const result = await Event.findOne({ _id: detailPageId, status: true })
      .select(
        "_id speaker title date price venueName cover keyPoint tagline about"
      )
      .populate({ path: "speaker", select: "_id name role avatar" });
    if (!result) {
      throw new customAPI.NotFoundError("No event with id" + detailPageId);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  console.log("event >>>");
  console.log(req.body.event);

  try {
    const { event: eventId, personalDetail, payment: paymentId } = req.body;

    // start checking event
    const checkingEvent = await Event.findOne({ _id: eventId });

    console.log(checkingEvent);

    if (!checkingEvent) {
      throw new CustomAPI.NotFoundError("No Event with id :" + eventId);
    }

    // checking stock ticket event
    if (checkingEvent.stock === 0) {
      throw new CustomAPI.NotFoundError("Stock event tidak mencukupi");
    } else {
      checkingEvent.stock = checkingEvent.stock -= 1;
      await checkingEvent.save();
    }

    const historyEvent = {
      title: checkingEvent.title,
      price: checkingEvent.price,
      date: checkingEvent.date,
      cover: checkingEvent.cover,
      about: checkingEvent.about,
      venueName: checkingEvent.venueName,
      tagline: checkingEvent.tagline,
      keyPoint: checkingEvent.keyPoint,
      category: checkingEvent.category,
      speaker: checkingEvent.speaker,
    };
    // end checking event

    // start checking payment
    const checkingPayment = await Payment.findOne({ _id: paymentId });

    if (!checkingPayment) {
      throw new CustomAPI.NotFoundError("No Payment with id :" + paymentId);
    }

    const historyPayment = {
      type: checkingPayment.type,
      imageUrl: checkingPayment.imageUrl,
    };
    // end checking payment

    // checkout
    const result = new Transaction({
      personalDetail: personalDetail,
      event: eventId,
      historyEvent: historyEvent,
      payment: paymentId,
      historyPayment: historyPayment,
      participant: req.user.id,
    });

    await result.save();

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  landingPage,
  detailPage,
  checkout,
};