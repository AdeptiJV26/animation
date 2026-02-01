import Link from "next/link";
import { Folder, Play, Type } from "lucide-react";

const applications = [
  {
    name: "Animations",
    description: "CSS and Framer Motion renders",
    path: "/animation",
    icon: <Play className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-50/50"
  },
  {
    name: "Auto Capital",
    description: "Text transformation tool",
    path: "/autocapital",
    icon: <Type className="w-8 h-8 text-emerald-500" />,
    color: "bg-emerald-50/50"
  },
  {
    name: "Auto Format Name",
    description: "Data normalization utility",
    path: "/autoformatname",
    icon: <Folder className="w-8 h-8 text-amber-500" />,
    color: "bg-amber-50/50"
  }
];

export default function Home() {
  return (
    <div className="p-8 space-y-6 w-full">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-txt1">Project Overview</h1>
        <p className="text-muted-foreground text-txt1">Select an application gateway to begin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <Link 
            key={app.path} 
            href={app.path}
            className={`group relative p-6 rounded-xl border transition-all hover:shadow-md ${app.color} hover:border-foreground/20`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                {app.icon}
                <div>
                  <h3 className="font-semibold text-lg">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}