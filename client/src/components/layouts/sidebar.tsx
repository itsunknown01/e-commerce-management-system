const SidebarLinks = [
    {title: "Dashborad"},
    {title: "Billboard"},
    {title: "Categories"},
    {title: "Products"},
    {title: "Sizes"},
    {title: "Colors"},
]

export default function Sidebar() {
    return(
        <div className="h-screen w-60 shadow-xl py-10">
           <div className="flex flex-col items-center gap-y-4 h-full">
             {SidebarLinks.map(link => (
                <dl>
                    {link.title}
                </dl>
             ))}
           </div>
        </div>
    )
}