import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

const MainTitle = styled(Title)`
  &&& {
    font-weight: 800;
    font-size: 48px;
  }
`;

export { MainTitle };
