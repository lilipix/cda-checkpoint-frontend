import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@apollo/client";
import { queryCountries } from "@/api/countries";
import { mutationCreateCountry } from "@/api/CreateCountry";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const CreateCountryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  code: z.string().min(1, {
    message: "Code is required",
  }),
  emoji: z.string().min(1, {
    message: "Emoji is required",
  }),
});

export type CreateCountryFormValues = z.infer<typeof CreateCountryFormSchema>;
const CreateCountry = () => {
  const [createCountry, { loading }] = useMutation(mutationCreateCountry, {
    refetchQueries: [{ query: queryCountries }],
  });

  const form = useForm<CreateCountryFormValues>({
    resolver: zodResolver(CreateCountryFormSchema),
    defaultValues: {
      name: "",
      code: "",
      emoji: "",
    },
  });

  async function onSubmit(data: CreateCountryFormValues) {
    try {
      await createCountry({
        variables: {
          data: {
            name: data.name,
            code: data.code,
            emoji: data.emoji,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex gap-4"
        >
          <Card className="flex-row p-4 m-10">
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <input placeholder="Name" className="input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <input placeholder="Code" className="input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji</FormLabel>
                    <FormControl>
                      <input placeholder="Emoji" className="input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit">
                Save CreateCountryFormValues
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateCountry;
