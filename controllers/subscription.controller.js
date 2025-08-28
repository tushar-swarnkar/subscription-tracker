import Subscription from "../models/subscription.model.js";
import {workFlowClient} from "../config/upstash.js";
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const response = await workFlowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id
            },
            headers: {
                'content-type':  'application/json',
            },
            retries: 0,
        });

        const { workflowRunId } = response;

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // check if user is the owner of the subscription
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401; // unauthorized
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            message: 'User subscription fetched successfully',
            data: subscriptions
        })
    } catch (e) {
        next(e);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const sub = await Subscription.findById(req.params.id)

        if (!sub) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: sub });
    } catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully',
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
}

// PUT cancel Subscription for a user
export const cancelSubscription = async (req, resj, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // check if user is the owner of the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }

        // set status to 'cancelled'
        subscription.status = "cancelled";
        await subscription.save();
    } catch (e) {
        next(e);
    }
}

// GET upcoming renewals subscription for a user
export const getUpcomingSubscriptions = async (req, res, next) => {
    try {
        // check if user is the owner of the subscription
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({
            user: req.user.id,
            status: 'active',
        }).populate("user", "name email");

        res
            .status(200)
            .json({
                success: true,
                message: 'Upcoming renewals fetched successfully',
                data: subscriptions,
            });
    } catch (e) {
        next(e);
    }
}
