import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import React from 'react'
import { useForm } from 'react-hook-form';

const CreateIssueForm = () => {
     const form = useForm({
        defaultValues: {
          issueName: "",
          description:""
        },
      });
    
      // Handle form submission
      const onSubmit = (data) => {
        console.log("Create project data:", data);
      };
    
  return (
    <div>
         <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email Input */}
          <FormField
            control={form.control}
            name="issueName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                    placeholder="issueName..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                    placeholder="description"
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
              Create Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateIssueForm