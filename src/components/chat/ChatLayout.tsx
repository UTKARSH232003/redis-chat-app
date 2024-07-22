// "use client"
// import { cn } from "@/lib/utils";
// import { useEffect, useState } from "react";
// import Sidebar from "../sidebar/Sidebar";
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

// interface ChatLayoutProps {
//     defaultLayout: number[] | undefined;
// }
// const ChatLayout = ({defaultLayout=[320, 480]}: ChatLayoutProps) => {
//   const handleLayoutChange = (sizes: number[]) => {
//     document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)};`;
//   };
//   const [isMobile, setIsMobile] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   useEffect(() => {
//     const checkScreenWidth = () => {
//       setIsMobile(window.innerWidth <= 768);
//     }
//     checkScreenWidth();
//     window.addEventListener("resize", checkScreenWidth);
//     return () => {
//       window.removeEventListener("resize", checkScreenWidth);
//     }
//   }, []);
//   const minSize = isMobile ? 0 : 24;
//   const maxSize = isMobile ? 8 : 30;
//   const collapsedSize = isMobile ? 0 : 8;
  
//   return (
//     <ResizablePanelGroup direction="horizontal" className="h-full items-stretch bg-background rounded-lg" onLayout={handleLayoutChange}>
//       <ResizablePanel defaultSize={defaultLayout[0]} collapsedSize={collapsedSize} collapsible={true} minSize={minSize} maxSize={maxSize} onCollapse={() => {setIsCollapsed(true); document.cookie = `react-resizable-panels:collapsed=true;`;}} onExpand={() => {setIsCollapsed(false); document.cookie = `react-resizable-panels:collapsed=false;`;}} className={cn(isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out")}>
//         <Sidebar isCollapsed={isCollapsed}/>
//         </ResizablePanel>
//       <ResizableHandle withHandle/>
//       <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
//         <div className="flex justify-center items-center h-full w-full px-10">
//           <div className="flex flex-col justify-center items-center gap-4">
//             <img src="/logo.png" alt="Logo" className="w-full md:w-2/3 lg:w-1/2"/>
//             <p className="text-muted-foreground text-center">Click on a chat to view the messagges</p>
//           </div>
//         </div>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//    )
// }

// export default ChatLayout;
"use client";
import { User } from "@/db/dummy";
import { cn } from "@/lib/utils";
import { useSelectedUser } from "@/store/useSelectedUser";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import MessageContainer from "./MessageContainer";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  users: User[];
}

const ChatLayout = ({ defaultLayout = [320, 480], users }: ChatLayoutProps) => {
  const handleLayoutChange = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)};`;
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {selectedUser} = useSelectedUser();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const minSize = isMobile ? 0 : 24;
  const maxSize = isMobile ? 8 : 30;
  const collapsedSize = isMobile ? 0 : 8;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch bg-background rounded-lg"
      onLayout={handleLayoutChange}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={collapsedSize}
        collapsible={true}
        minSize={minSize}
        maxSize={maxSize}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=true;`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=false;`;
        }}
        className={cn(isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out")}
      >
          <Sidebar isCollapsed={isCollapsed} users={users}/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {!selectedUser && (
          <div className="flex justify-center items-center h-full w-full px-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-full md:w-2/3 lg:w-1/2" />
            <p className="text-muted-foreground text-center">Click on a chat to view the messages</p>
          </div>
        </div>
        )}
        {selectedUser && (<MessageContainer/>)}
        
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatLayout;
