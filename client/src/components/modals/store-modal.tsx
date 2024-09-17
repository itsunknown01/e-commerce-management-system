import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import { onClose } from "../../redux/slices/modal";
import { RootState } from "../../redux/store";
import { storeSchema } from "../../schemas/store";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import { useCreateStoreMutation } from "../../services/store";

const StoreModal = () => {
  const { isOpen } = useSelector((state: RootState) => state.reducer.modal);

  const [createStore, { isLoading, isSuccess }] = useCreateStoreMutation();

  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const Submit = async (values: z.infer<typeof storeSchema>) => {
    try {
      const response = await createStore(values).unwrap();
      if (isSuccess) {
          // window.location.assign(`/${response.data.id}`);
      }
      dispatch(onClose())
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage catregories and products"
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(Submit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter the store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={() => dispatch(onClose())}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
