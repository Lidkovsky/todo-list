import Tabs from "@/components/CategoryTabs";
import Footer from "@/components/Footer";

import TasksList from "@/components/TasksList";

export default function Home() {
  return (
    <main className="flex px-2 min-h-screen flex-col items-center justify-center  bg-slate-400">
      <div className="relative w-full box-border flex h-[420px] flex-col items-center justify-between rounded-lg max-w-3xl mx-auto bg-white">
        <Tabs>
          <TasksList />
        </Tabs>
        <Footer />
      </div>
    </main>
  );
}
