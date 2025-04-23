import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { createProjects } from '@/Redux/project/action';

const CreateProjectForm = () => {
    const dispatch=useDispatch()
    const form = useForm({
        defaultValues: {
            name: "",
            category: "",
            description: "",
            tags: [], // Array to store multiple tags
        },
    });

    const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

    // Handle form submission
    const onSubmit = (data) => {
        dispatch(createProjects(data));
        console.log("Create project data:", data);
    };

    // Handle category selection
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        form.setValue('category', value);
    };

    // Handle adding/removing tags
    const handleTagChange = (newValue) => {
        const currentTags = form.getValues("tags");
        const updatedTags = currentTags.includes(newValue)
            ? currentTags.filter((tag) => tag !== newValue) // Remove tag if already selected
            : [...currentTags, newValue]; // Add tag if not selected
        form.setValue("tags", updatedTags);
    };

    const isFreePlanLimitReached = false;

    return (
        <div className="p-5 bg-gray-900 text-white rounded-lg">
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Project Description Input */}
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
                                        placeholder="Project description..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project Name Input */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                                        placeholder="Project name..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category Select */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select value={field.value} onValueChange={handleCategoryChange}>
                                        <SelectTrigger className="w-full border border-gray-700 bg-gray-800 text-white">
                                            <SelectValue placeholder="Select Category">
                                                {selectedCategory || "Select Category"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-white">
                                            <SelectItem value="fullstack">Full Stack</SelectItem>
                                            <SelectItem value="frontend">FrontEnd</SelectItem>
                                            <SelectItem value="backend">BackEnd</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Tags Select (Multiple Selection) */}
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={handleTagChange}>
                                        <SelectTrigger className="w-full border border-gray-700 bg-gray-800 text-white">
                                            <SelectValue placeholder="Select Tags" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black text-gray-400">
                                            <SelectItem value="react">React</SelectItem>
                                            <SelectItem value="nextjs">Next.js</SelectItem>
                                            <SelectItem value="springboot">Spring Boot</SelectItem>
                                            <SelectItem value="mysql">MySQL</SelectItem>
                                            <SelectItem value="mongodb">MongoDB</SelectItem>
                                            <SelectItem value="angular">Angular</SelectItem>
                                            <SelectItem value="python">Python</SelectItem>
                                            <SelectItem value="flask">Flask</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {/* Display selected tags with remove option */}
                                <div className="flex gap-1 flex-wrap mt-2">
                                    {field.value.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => handleTagChange(item)}
                                            className="cursor-pointer flex rounded-full items-center border gap-2 py-1 px-3 bg-gray-700"
                                        >
                                            <span className="text-sm">{item}</span>
                                            <Cross1Icon className="h-3 w-3" />
                                        </div>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Plan Limitation Message */}
                    {isFreePlanLimitReached ? (
                        <div className="text-red-500 text-sm">
                            <p>You can create only 3 projects with the free plan. Please upgrade your plan.</p>
                        </div>
                    ) : (
                        <DialogClose>
                            <Button type="submit" className="w-full mt-5 bg-blue-600 hover:bg-blue-700">
                                Create Project
                            </Button>
                        </DialogClose>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default CreateProjectForm;