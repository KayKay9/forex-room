"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSubmit } from "./form-submit";
import { Input } from "../ui/input";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChannelAction } from "@/actions/create-channel";
import { SelectOptions } from "@/lib/types";
import { useSafeAction } from "@/hooks/use-safe-action";
import { useAddChatModal } from "@/hooks/use-add-chat-modal";
import { CreateChannelSchema } from "@/schemas";
import { ElementRef, useRef } from "react";
import { Switch } from "../ui/switch";

export const CreateChannelForm = () => {
  const { onClose } = useAddChatModal();

  const { execute, isLoading } = useSafeAction(createChannelAction, {
    onError: (data) => {
      toast.error(data);
    },
    onSuccess: () => {
      toast.success("Channel created succesfully.");
      onClose();
    },
  });

  const form = useForm<z.infer<typeof CreateChannelSchema>>({
    resolver: zodResolver(CreateChannelSchema),
    defaultValues: {
      name: "",
      isPrivate: false,
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);

  const onSubmit = (data: FormData) => {
    const name = data.get("name") as string;
    const isPrivate = form.getValues("isPrivate");

    execute({
      name,
      isPrivate,
    });
  };

  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h3 className="text-xl text-light-black font-semibold">
          Create channel
        </h3>
        <p className="text-neutral-400 text-sm">
          Create a Channel
        </p>
      </div>

      <Form {...form}>
        <form ref={formRef} action={onSubmit} className="space-y-6 ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Lorem ipsum"
                      type="text"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Private Channel</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormSubmit
            className="ml-auto  float-right self-end"
            disabled={form.formState.isSubmitting || isLoading}
          >
            Create
          </FormSubmit>
        </form>
      </Form>
    </div>
  );
};
