import React from 'react';
import { Card } from '@/components/ui/card';
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Item } from '@radix-ui/react-radio-group';
import { useNavigate } from 'react-router-dom';

const ProjectCard = () => {
    const navigate=useNavigate()
  return (
    <Card className="bg-slate-1000 text-white w-full p-4 border border-gray-700 rounded-lg space-y-3">
      <div className='w-full space-y-2'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-3'>
            <h1 onClick={()=>navigate("/project/3")} className='cursor-pointer font-bold text-lg'>
              Create Ecommerce Project
            </h1>
            <DotFilledIcon />
            <p className='text-sm text-gray-400'>fullstack</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" variant="ghost" size="icon">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Update</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className='text-gray-500 text-sm'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <div className='flex flex-wrap gap-2 items-center'>
          {["frontend", "backend", "react", "nextjs"].map((tag, index) => (
            <Badge key={index} variant="outline" className="text-gray-400">{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;