import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    // Отримати токен із заголовків запиту
    const token = req.headers.authorization?.replace("Bearer ", "");

    // Перевірити, чи є токен
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "MissingToken",
        message: "Unauthorized: Missing token",
      });
    }

    // Перевірити та декодувати токен
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Перевірити, чи був успішно декодований токен
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: "InvalidToken",
        message: "Unauthorized: Invalid token",
      });
    }
    const userId = decoded.sub;

    // Отримати параметр id і метод запиту
    const {
      query: { id },
      method,
    } = req;
    console.log(id + "ededededed");
    // Обробка запиту в залежності від методу
    switch (method) {
      case "GET":
        try {
          const event = await Event.findById({ _id: id, user: userId });

          // Перевірити, чи знайдено подію та чи користувач має доступ
          if (!event || event.user.toString() !== userId) {
            return res.status(404).json({
              success: false,
              error: "EventNotFoundOrUnauthorized",
              message: "Event not found or unauthorized",
            });
          }

          // Відправити успішний результат
          res.status(200).json({ success: true, data: event });
        } catch (error) {
          // Відправити помилку сервера при виникненні помилки у процесі отримання події
          res.status(500).json({
            success: false,
            error: "GetEventError",
            message: "Internal Server Error: Unable to get event",
          });
        }
        break;

      case "PUT":
        try {
          const event = await Event.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          // Перевірити, чи знайдено подію та чи користувач має доступ
          if (!event || event.user.toString() !== userId) {
            return res.status(404).json({
              success: false,
              error: "EventNotFoundOrUnauthorized",
              message: "Event not found or unauthorized",
            });
          }
          // Відправити успішний результат
          res.status(200).json({ success: true, data: event });
        } catch (error) {
          // Відправити помилку сервера при виникненні помилки у процесі оновлення події
          res.status(500).json({
            success: false,
            error: "UpdateEventError",
            message: "Internal Server Error: Unable to update event",
          });
        }
        break;

      case "DELETE":
        try {
          console.log(id);
          console.log(userId);
          const deletedEvent = await Event.deleteOne({
            _id: id,
            user: userId,
          });
          console.log(deletedEvent);
          // Перевірити, чи знайдено подію та чи користувач має доступ
          if (!deletedEvent || deletedEvent.deletedCount === 0) {
            return res.status(404).json({
              success: false,
              error: "EventNotFoundOrUnauthorized",
              message: "Event not found or unauthorized",
            });
          }

          // Відправити успішний результат
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          // Відправити помилку сервера при виникненні помилки у процесі видалення події
          res.status(500).json({
            success: false,
            error: "DeleteEventError",
            message: "Internal Server Error: Unable to delete event",
          });
        }
        break;

      default:
        // Відправити помилку, якщо отримано непідтримуваний метод
        res.status(400).json({
          success: false,
          error: "InvalidMethod",
          message: "Invalid method",
        });
        break;
    }
  } catch (error) {
    // Відправити помилку авторизації, якщо є проблеми з токеном або декодуванням
    res.status(401).json({
      success: false,
      error: "InvalidToken",
      message: "Unauthorized: Invalid token",
    });
  }
}
