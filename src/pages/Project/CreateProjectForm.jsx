import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createProjects } from '@/Redux/project/action';

const CreateProjectForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.project); // Get loading state
    
    const form = useForm({
        defaultValues: {
            name: "",
            category: "",
            description: "",
            tags: [], // Array to store multiple tags
        },
        mode: "onChange" // Enable real-time validation
    });

    const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            console.log("Create project data:", data);
            
            // Validate required fields
            if (!data.name.trim()) {
                form.setError("name", { message: "Project name is required" });
                return;
            }
            if (!data.category) {
                form.setError("category", { message: "Category is required" });
                return;
            }
            if (!data.description.trim()) {
                form.setError("description", { message: "Description is required" });
                return;
            }

            // Dispatch the create action
            await dispatch(createProjects(data));
            
            // Reset form after successful creation
            form.reset();
            setSelectedCategory("");
            
            // Close dialog if onClose function is provided
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    // Handle category selection
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        form.setValue('category', value);
        form.clearErrors("category"); // Clear any existing category errors
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
                    {/* Project Name Input - Move to top as it's most important */}
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ 
                            required: "Project name is required",
                            minLength: { value: 3, message: "Project name must be at least 3 characters" }
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                                        placeholder="Project name..."
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project Description Input */}
                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ 
                            required: "Project description is required",
                            minLength: { value: 10, message: "Description must be at least 10 characters" }
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border border-gray-700 py-2 px-4 bg-gray-800 text-white"
                                        placeholder="Project description..."
                                        disabled={loading}
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
                        rules={{ required: "Please select a category" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select 
                                        value={field.value} 
                                        onValueChange={handleCategoryChange}
                                        disabled={loading}
                                    >
                                        <SelectTrigger className="w-full border border-gray-700 bg-gray-800 text-white">
                                            <SelectValue placeholder="Select Category">
                                                {selectedCategory || "Select Category"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-white">
                                            <SelectItem value="fullstack">Full Stack</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
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
                                    <Select onValueChange={handleTagChange} disabled={loading}>
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
                                    {field.value && field.value.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => !loading && handleTagChange(item)}
                                            className={`cursor-pointer flex rounded-full items-center border gap-2 py-1 px-3 bg-gray-700 ${loading ? 'opacity-50' : 'hover:bg-gray-600'}`}
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
                        <div className="flex gap-3">
                            <Button 
                                type="submit" 
                                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50" 
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Project"}
                            </Button>
                            {onClose && (
                                <DialogClose asChild>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="mt-5"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                            )}
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default CreateProjectForm;