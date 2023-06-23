import "@styles/globals.css";
import Nav from "@components/Nav";
import Title from "@components/Title";


export const metadata = {
  title: "Novel-tea: Brewing Bookish Delights",
  description: "Brewing Bookish Delights",
};

const RootLayout = ({children}) => (
  <html lang='en'>
    <body className="m-0">
        <Title/>
        <Nav/>
        {children}
    </body>
  </html>
);

export default RootLayout;


