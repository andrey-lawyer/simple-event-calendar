import { useState, useEffect } from "react";

import {
  convertDurationToTime,
  convertMinutesToTime,
} from "@/services/calculateMinutes";

import { initialValues } from "@/data/initialValues";
import { api } from "@/services/axiosInstance";

export const useUpdateEvent = (
  type: "add" | "update",
  id?: string | string[]
) => {
  const [initialValuesUpdate, setInitialValuesUpdate] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Error: Missing token.");
          return { success: false, message: "Missing token" };
        }

        const response = await api.get(`events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const eventData = response.data.data;

        const startTime = convertMinutesToTime(eventData.start);
        const durationTime = convertDurationToTime(eventData.duration);

        setInitialValuesUpdate({
          hours: startTime.hours,
          minutes: startTime.minutes,
          durationHours: durationTime.hours,
          durationMinutes: durationTime.minutes,
          title: eventData.title,
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    if (type === "update" && id) {
      fetchData();
    }
  }, [type, id]);

  return type === "add" ? initialValues : initialValuesUpdate;
};
