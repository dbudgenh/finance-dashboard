import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>["json"];

export const useBulkDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"].$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Accounts deleted succesfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // TODO: Also invalidate summmary
    },
    onError: (error) => {
      toast.error(`Failed to delete accounts: ${error.message}`);
    },
  });

  return mutation;
};
