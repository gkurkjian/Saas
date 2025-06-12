import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import RouteGuard from "./components/RouteGuard";

export default function App({ Component, pageProps }) {
  return (
    <>
      <RouteGuard>
          <Component {...pageProps} />;
      </RouteGuard>
    </>
  )
}
