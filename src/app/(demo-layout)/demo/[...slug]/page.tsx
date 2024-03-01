const Demo = ({ params }: { params: { slug: string[] } }) => {
  return <iframe className="main" src={`/${params.slug.join("/")}`} />;
};

export default Demo;
