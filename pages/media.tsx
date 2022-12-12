/* eslint-disable jsx-a11y/anchor-is-valid */

import Card from "../components/media-card";
import Footer from "../components/footer";

function App() {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="w-full text-center p-14 bg-gradient-to-r from-blue-50 to-blue-1000">
        <h1 className="font-bold text-4xl text-white">OSFD Stickers and Emojis</h1>
      </div>

      {/* Sticker section */}
      <div className="max-w-[1300px] grid grid-cols-2 place-items-center gap-2 m-auto mt-10 sm:grid-cols-3 md:grid-cols-5 ">
        <Card image="/media components/duck-animated.gif" title="Duck" href="" />
        <Card image="/media components/glasses-sticker-animated.gif" title="Glasses" href="" />
        <Card image="/media components/Llama-Noun-animated.gif" title="Llama" href="" />
        <Card image="/media components/noun-195-animated.gif" title="Noun-195" href="" />
        <Card
          image="/media components/noun-monkey-accesories-animated.gif"
          title="Monkey"
          href=""
        />
        <Card image="/media components/nouns-beer-partners.gif" title="Beer" href="" />
        <Card image="/media components/nouns-rocket-animation.gif" title="Rocket" href="" />
        <Card image="/media components/parachute-animated.gif" title="Parachute" href="" />
        <Card image="/media components/beer.gif" title="Beer" href="" />
        <Card image="/media components/bigfoot.gif" title="Bigfoot" href="" />
        <Card image="/media components/chameleon.gif" title="Chameleon" href="" />
        <Card image="/media components/fishbowl-boy.gif" title="Fishbowl" href="" />
        <Card image="/media components/fox.gif" title="Fox" href="" />
        <Card image="/media components/ghost.gif" title="Ghost" href="" />
        <Card image="/media components/surf-boy.gif" title="Surf boy" href="" />
      </div>

      {/* Traits section */}
      {/* <section>
        <h2 className="font-bold text-2xl text-center mb-3 mt-36">Traits</h2>
        <div className="w-3/4 flex flex-row gap-7 m-auto justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section> */}

      {/* Links section */}
      <section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10 justify-between px-40 py-16 mt-20 mb-32 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-gray-50">
          <div className="flex flex-col items-center basis-1/6 space-y-6">
            <h3 className="w-40 text-xl font-semibold text-center leading-tight">
              Adding your own custom sticker packs to Discord
            </h3>
            <a
              href="https://www.makeuseof.com/how-to-use-stickers-on-discord/"
              target="_blank"
              className="w-40 p-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
              rel="noreferrer"
            >
              How To
            </a>
          </div>
          <div className="flex flex-col items-center basis-1/6 space-y-6">
            <h3 className="w-40 text-xl font-semibold text-center">
              Adding your own custom sticker packs to Slack
            </h3>
            <a
              href="https://slack.com/help/articles/206870177-Add-custom-emoji-and-aliases-to-your-workspace"
              target="_blank"
              className="w-40 p-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
              rel="noreferrer"
            >
              How To
            </a>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-xl font-semibold text-center mb-6">Cool links</h3>
            <a
              href="#"
              target="_blank"
              className="w-40 p-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Slackmojis
            </a>
            <a
              href="#"
              target="_blank"
              className="w-40 p-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Cool links 1
            </a>
            <a
              href="#"
              target="_blank"
              className="w-40 p-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Cool links 2
            </a>
          </div>
        </div>
      </section>

      <Footer gradient={"bg-gradient-to-r from-blue-1000 to-blue-50 relative text-white w-full"} />
    </div>
  );
}

export default App;
