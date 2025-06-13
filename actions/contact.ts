"use server";

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
      chat_id: 622770273,
      parse_mode: "HTML",
      text: "",
    };
    await fetch(getTgUrl("7179096329:AAEIhP6Zzb2LALffrZzkgM9nMLuJAwemZpg"), {
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
