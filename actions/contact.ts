"use server";

import { TG_BOT_TOKEN, TG_CHAT_ID } from "@/config";
import { ContactFormData, contactSchema } from "@/schema";

type FormResponse = {
  status: boolean;
  body: {
    message: string;
  };
};

export async function leadSubmissionAction(
  data: ContactFormData,
): Promise<FormResponse> {
  let validation = contactSchema.safeParse(data);
  try {
    if (!validation.success)
      throw new Error("Form submission failed, please try again later");

    console.log(validation.data);

    const { name, email, message, subject } = validation.data;

    const data = {
      chat_id: TG_CHAT_ID,
      parse_mode: "HTML",
      text: `<b>🎉 New Lead Alert!</b>\n\n
🙋‍♂️ <b>Name:</b> ${name}\n
📧 <b>Email:</b> ${email}\n
📚 <b>Subject:</b> ${subject}\n
💬 <b>Message:</b> ${message}\n\n`,
    };
    console.log(data);
    if (!TG_BOT_TOKEN) throw new Error("Invalid Token");
    await fetch(getTgUrl(TG_BOT_TOKEN), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return {
      status: true,
      body: {
        message: "Form submission successful",
      },
    };
  } catch (error) {
    console.log("e", error);
    return {
      status: false,
      body: {
        message: "Form submission failed, please try again later",
      },
    };
  }
}

const getTgUrl = (token: string) => {
  return `https://api.telegram.org/bot${token}/sendMessage`;
};
