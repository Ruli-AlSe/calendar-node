import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { User } from '../models/User';

interface EventRequest extends Request {
  uid?: string;
  name?: string;
}

export const getEvents = async (req: EventRequest, res: Response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events,
  });
};

export const createEvent = async (req: EventRequest, res: Response) => {
  const event = new Event(req.body);

  try {
    const user = await User.findById(req.uid);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'User does not exist in the DB',
      });
    }

    event.user = user.id;
    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    res.status(500).json({
      ok: false,
      message: 'Error - Please contact your system administrator',
    });
  }
};
export const updateEvent = async (req: EventRequest, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: 'Event not found',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        message: 'You are not authorized to update this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    res.status(500).json({
      ok: false,
      message: 'Error - Unable to update event',
    });
  }
};

export const deleteEvent = async (req: EventRequest, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: 'Event not found',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        message: 'You are not authorized to perform this action',
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    res.status(500).json({
      ok: false,
      message: 'Error - Unable to update event',
    });
  }
};
