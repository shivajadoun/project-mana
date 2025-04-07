import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const handleUpdateIssueStatus = (status) => {
    console.log("Updated status:", status);
  };

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        {/* Left section */}
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-lg font-semibold">Create navbar</h1>

            <div className="py-5">
              <h2 className="font-semibold">Description</h2>
              <p className="text-sm mt-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, error eum reiciendis repellendus quam.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3 font-semibold">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  All: Make changes to your account here.
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {[1, 2, 3].map((item, index) => (
                      <CommentCard key={index} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  History: Change your password here.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        {/* Right section */}
        <div className="w-full lg:w-[30%] space-y-4">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To Do" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5 font-medium">Details</p>
            <div className="space-y-7 px-5 py-3">
              {/* Assignee */}
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Assignee</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-xs">
                    <AvatarFallback>Z</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Zachary</span>
                </div>
              </div>

              {/* Labels */}
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Labels</p>
                <p>None</p>
              </div>

              {/* Status */}
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Status</p>
                <Badge>In Progress</Badge>
              </div>

              {/* Release */}
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Release</p>
                <p>10-04-2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
