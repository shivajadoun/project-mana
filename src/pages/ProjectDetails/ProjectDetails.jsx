import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";

import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";

const ProjectDetails = () => {
  // Corrected typo in function name
  const handleProjectInvitation = () => {
    // Function logic here if needed (currently empty)
    console.log("Invite button clicked");
  };

  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[75%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                Create Ecommerce Website
              </h1>

              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </p>

                <div className="flex">
                  <p className="w-36">Project Lead:</p>
                  <p>Shiva</p>
                </div>

                <div className="flex items-center">
                  <p className="w-36">Members:</p>
                  <div className="flex items-center gap-2">
                    {/* Check if team exists to avoid undefined error */}
                    {ProjectDetails?.team?.map((item) => (
                      <Avatar className="cursor-pointer" key={item}>
                        <AvatarFallback className="bg-gray-600">S</AvatarFallback>
                      </Avatar>
                    )) || <p>No team members</p>}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleProjectInvitation}
                          className="ml-2"
                        >
                          <span>Invite</span>
                          <PlusIcon className="w-3 h-3 ml-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Invite User</DialogHeader>
                        <InviteUserForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex">
                  <p className="w-36">Category:</p>
                  <p>Fullstack</p>
                </div>
              </div>

              {/* Removed duplicate Project Lead section */}
              <div className="flex">
                <p className="w-36">Project Lead:</p>
                <Badge className="bg-gray-600">Shiva</Badge>
              </div>

              <section>
                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-2 justify-between py-5">
                  <IssueList status="pending" title="ToDo List" />
                  <IssueList status="in_progress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>

          <div className="lg:w-[30%] rounded-md sticky right-5 top-0">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;