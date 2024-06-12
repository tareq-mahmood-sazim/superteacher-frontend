import { Container, Text } from "@mantine/core";

import { useNoDataStyles } from "./NoData.styles";

const NoData: React.FC<{ description?: string; textSize?: string }> = ({
  description = "No Data",
  textSize = "xl",
}) => {
  const { classes } = useNoDataStyles();
  return (
    <Container className={classes.noData}>
      <Text size={textSize}> {description}</Text>
    </Container>
  );
};

export default NoData;
