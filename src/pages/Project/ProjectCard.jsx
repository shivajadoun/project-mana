// Fixed ProjectCard.jsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '@/Redux/project/action';

const ProjectCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteProject({ projectId: item.id }));
    }

    // Add safety checks for item properties
    if (!item) {
        return null;
    }

    return (
        <Card className="bg-slate-1000 text-white w-full p-4 border border-gray-700 rounded-lg space-y-3">
            <div className='w-full space-y-2'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-3'>
                        <h1 
                            onClick={() => navigate("/project/" + item.id)} 
                            className='cursor-pointer font-bold text-lg hover:text-blue-400 transition-colors'
                        >
                            {item.name || 'Untitled Project'}
                        </h1>
                        <DotFilledIcon />
                        <p className='text-sm text-gray-400'>{item.category || 'No Category'}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="rounded-full" variant="ghost" size="icon">
                                <DotsVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Update</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className='text-gray-500 text-sm'>
                    {item.description || 'No description available'}
                </p>
                <div className='flex flex-wrap gap-2 items-center'>
                    {/* Fixed: Check if tags exist and is an array */}
                    {item.tags && Array.isArray(item.tags) && item.tags.map((tag, index) => (
                        <Badge key={`${item.id}-${tag}-${index}`} variant="outline" className="text-gray-400">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;