"use client";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ContactFormData, contactSchema } from "@/schema";
import { leadSubmissionAction } from "@/actions/contact";
import { toaster } from "@/components/ui/toaster";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    const res = await leadSubmissionAction(data);
    setIsLoading(false);

    //check for success
    if (res.status) {
      toaster.create({
        title: res.body.message,
        type: "success",
      });
      reset();
      return;
    } else {
      //toast an error
      toaster.create({
        title: res.body.message,
        type: "error",
      });
    }
  };

  return (
    <Stack
      bg="rgba(255, 255, 255, 0.75)"
      borderRadius="xl"
      boxShadow="md"
      w={{ base: "md", sm: "xl" }}
      backdropFilter="blur(5px)"
      p={6}
      mx="5%"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading mb=".5rem" size="2xl" color="gray.800">
        Contact Us
      </Heading>

      <hr />

      <Field.Root required invalid={!!errors.name}>
        <Field.Label>
          Name <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type="text"
          placeholder="John Doe"
          {...register("name")}
          variant="subtle"
        />
        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root required invalid={!!errors.email}>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          variant="subtle"
        />
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root required invalid={!!errors.subject}>
        <Field.Label>
          Subject <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type="text"
          placeholder="Inquiry Subject"
          variant="subtle"
          {...register("subject")}
        />
        <Field.ErrorText>{errors.subject?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root required invalid={!!errors.message}>
        <Field.Label>
          Message <Field.RequiredIndicator />
        </Field.Label>
        <Textarea
          placeholder="Your message here..."
          variant="subtle"
          {...register("message")}
        />
        <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
      </Field.Root>
      <Button loading={isLoading} colorPalette="teal" mt=".5rem" type="submit">
        Send <IoIosSend />
      </Button>
    </Stack>
  );
};

export default ContactForm;
