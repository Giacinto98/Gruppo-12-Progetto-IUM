interface Props {
  leftImg: string;
  altLeftImg: string;
  profileImg: string;
  name: string;
  title: string;
  content: string;
}

const HeroCarouselItem = ({ leftImg, profileImg, name, title, content }: Props) => {
  return (
    <article className="grid lg:grid-cols-2">
      <img src={leftImg} alt="" className="hidden lg:block h-full object-cover" />
      <div className="bg-white flex flex-col items-center pt-6 pb-10 md:pt-10 md:pb-16 lg:py-20 space-y-10 mx-auto">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={profileImg}
            alt={`immagine profilo di ${name}`}
            className="rounded-full max-w-[120px]"
          />
          <p className="text-xs ">{name}</p>
        </div>
        <header className="flex flex-col items-center space-y-6">
          <h2 className="font-semibold text-xl text-primary-text">{title}</h2>
          <p className=" px-7 lg:max-w-[70%]">{content}</p>
        </header>
      </div>
    </article>
  );
};

export default HeroCarouselItem;
