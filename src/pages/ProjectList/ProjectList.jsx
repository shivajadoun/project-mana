// src/Project/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProjectCard from '../Project/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchProjects } from '@/Redux/project/action';
import { fetchProjects } from '@/Redux/project/action';

export const tags = [
  { id: "t1", value: "all", label: "All" },
  { id: "t2", value: "react", label: "React" },
  { id: "t3", value: "nextjs", label: "Next.js" },
  { id: "t4", value: "springboot", label: "Spring Boot" },
  { id: "t5", value: "mysql", label: "MySQL" },
  { id: "t6", value: "mongodb", label: "MongoDB" },
  { id: "t7", value: "angular", label: "Angular" },
  { id: "t8", value: "python", label: "Python" },
  { id: "t9", value: "flask", label: "Flask" }
];

const ProjectList = () => {
  const { project } = useSelector(state => state);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  // Load projects on component mount
  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  const handleFilterCateogory = (value) => {
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
    console.log("Selected category filter:", value);
  };

  const handleFilterTag = (value) => {
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }
    console.log("Selected tag filter:", value);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setKeyword(searchValue);
    if (searchValue) {
      dispatch(searchProjects(searchValue));
    } else {
      dispatch(fetchProjects({}));
    }
  };

  // Add error handling and loading states
  if (project?.loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-white">Loading projects...</div>
      </div>
    );
  }

  if (project?.error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-500">Error loading projects: {project.error}</div>
      </div>
    );
  }

  // Safely get projects array
  const projectsToShow = keyword 
    ? (project?.searchProjects || []) 
    : (project?.projects || []);

  return (
    <div className="relative px-5 lg:px-0 flex gap-10 justify-center py-5">
      <div className="flex gap-6 items-start w-full lg:w-auto">
        <section className="w-[20rem] pl-10">
          <Card className="p-5 sticky top-10 max-h-[90vh] bg-gray-1000 text-white border border-gray-900">
            <div className="flex justify-between">
              <p className="text-xl tracking-wider">Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="max-h-[65vh] overflow-auto space-y-7">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup defaultValue="all" onValueChange={handleFilterCateogory}>
                      {[{ id: "r1", value: "all", label: "All" },
                        { id: "r2", value: "fullstack", label: "Fullstack" },
                        { id: "r3", value: "frontend", label: "Frontend" },
                        { id: "r4", value: "backend", label: "Backend" },
                      ].map(({ id, value, label }) => (
                        <div key={id} className="flex items-center gap-2">
                          <RadioGroupItem className="custom-radio bg-white" value={value} id={id} />
                          <Label htmlFor={id}>{label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                  <div className="pt-5">
                    <RadioGroup defaultValue="all" onValueChange={handleFilterTag}>
                      {tags.map(({ id, value, label }) => (
                        <div key={id} className="flex items-center gap-2">
                          <RadioGroupItem className="custom-radio bg-white" value={value} id={id} />
                          <Label htmlFor={id}>{label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <div className="relative flex flex-col items-center w-[35rem]">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              className="w-full pl-12 pr-4 py-2 text-lg border border-gray-700 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={handleSearchChange}
              value={keyword}
              placeholder="Search for a project..."
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>

          {/* Project Cards Below Search Bar */}
          <div className="w-full mt-2 space-y-2">
            {projectsToShow.length > 0 ? (
              projectsToShow.map((item, index) => (
                <ProjectCard key={item?.id || index} item={item} />
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                {keyword ? "No projects found matching your search" : "No projects available"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;