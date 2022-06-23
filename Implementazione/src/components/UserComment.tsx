interface Props {
  name: string;
  profileImg: string;
  comment: string;
  data?: string;
}

const UserComment = ({ name, profileImg, comment, data }: Props) => {
  return (
    <article>
      <header className="flex items-center space-x-5">
        <img className="profile-img" src={profileImg} alt="" />
        <div className="flex flex-col text-xs">
          <h4 className="">{name}</h4>
          {data && <span>{data}</span>}
        </div>
      </header>
      <p className="mt-4 md:pl-[100px]">{comment}</p>
    </article>
  );
};

export default UserComment;
