import { Box, Image } from "@mantine/core";

import "./Sidebar.css";

const SideBar: React.FC<{ data: ProductData }> = ({ data }) => {
  return (
    <Box p="0" h="100%" bg="#fff">
      <Image src={data?.image} w="100%" />
      <div className="tags">
        {data?.tags?.map((tag: any) => (
          <span className="tag-box" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Box>
  );
};

export default SideBar;
