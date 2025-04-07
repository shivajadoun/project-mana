import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const InviteUserForm = () => {
    // Initialize the form with useForm
    const form = useForm({
        defaultValues: {
            email: "", // Default value for the email field
        },
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log("Invite user data:", data);
    };

    return (
        <div className="bg-black p-4">
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email" // Changed to type="email" for better validation
                                        className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                                        placeholder="user email..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogClose>
                        <Button
                            type="submit"
                            className="w-full mt-5 bg-blue-600 hover:bg-blue-700"
                        >
                            Invite User
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default InviteUserForm;