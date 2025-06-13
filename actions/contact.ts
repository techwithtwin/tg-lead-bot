"use server";

<<<<<<< HEAD
import { TG_BOT_TOKEN, TG_CHAT_ID } from "@/config";
=======
import { TG_BOT_TOKEN } from "@/config";
>>>>>>> c512a5384fb247faad7c61f5a02a3fb5ff46a2bc
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
<<<<<<< HEAD
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
=======
      chat_id: 445532,
      parse_mode: "HTML",
      text: "<b>🎉 New Lead Alert!</b>\n\n👤 <b>Name:</b> Boniface Maina\n🎂 <b>Age:</b> 20\n🏫 <b>School:</b> TWT\n💰 <b>Budget:</b> Ksh 10,000 \n <code>let a = '10'</code>",
    };

    if (!TG_BOT_TOKEN) throw new Error("Invalid token");

>>>>>>> c512a5384fb247faad7c61f5a02a3fb5ff46a2bc
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
