import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/Redux/Auth/Action';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch=useDispatch();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(register(data));
    console.log('Signup data:', data);
  };

  return (
    <div className="space-y-5 z-[1] relative">
      <h1>Register</h1>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                    placeholder="Full Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5 bg-blue-600 hover:bg-blue-700">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;