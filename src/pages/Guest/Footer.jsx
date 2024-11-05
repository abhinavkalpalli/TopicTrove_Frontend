import { Link } from "react-router-dom";
import profileHolder from '../../assets/TopicTrove.png'

export default function Footer() {
  return (
    <>
      <footer
        className="wow fadeInUp p-10 relative z-10 bg-[#090E34] pt-5 lg:pt-[60px]"
        data-wow-delay=".15s"
      >
        <div className="container">
          <div className="mb-12 w-full items-center justify-center flex flex-col">
            <img
              src={profileHolder}
              alt="Logo"
              className="h-20 w-20 rounded-full"
            />
            <h1 className="mb-6 inline-block text-white max-w-[160px]">
              TopicTrove
            </h1>
            <h1 className="mb-8 max-w-[400px] text-white text-center">
              "Come lets enjoy reading"
            </h1>
          </div>
        </div>

        <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-2/3 lg:w-1/2">
                <div className="my-1">
                  <div className="-mx-3 flex items-center justify-center md:justify-start">
                    <Link
                      to={""}
                      className="px-3 text-text  text-white hover:underline"
                    >
                      Code of Conduct
                    </Link>
                    <Link
                      to={""}
                      className="px-3 text-text  text-white hover:underline"
                    >
                      Contributing
                    </Link>
                    <Link
                      to={""}
                      className="px-3 text-text  text-white hover:underline"
                    >
                      LICENCE
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/3 lg:w-1/2">
                <div className="my-1 flex justify-center md:justify-end">
                  <h1 className="text-white ">
                    Designed and Developed by
                    <Link to={""} className="text-gray-1 hover:underline">
                      TopicTrove
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
