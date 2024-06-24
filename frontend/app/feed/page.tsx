import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Inset,
  Strong,
  Text,
} from "@radix-ui/themes";

const page = () => {
  return (
    <div className="pt-20">
      <Flex direction="column" gap="5" className="">
        <Text size="1" align="center">
          Quick glance
        </Text>

        <Text size="9" align="center" highContrast>
          Stories & Ideas
        </Text>
        <Text size="2" align="center" color="gray">
          The Latest Blogs according to your interests
        </Text>
      </Flex>
      <Flex justify="center">
        <Box className="p-4 w-1/3 h-1/2">
          <Card size="2" className="h-max">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
            consectetur elit, ut maximus elit. Praesent eu mauris sit amet lorem
            sodales egestas non nec massa. Vivamus ligula libero, mattis eu
            rutrum eget, vehicula sit amet dolor. Praesent ipsum leo, tempus id
            arcu et, consequat vulputate lacus. Duis tellus ex, eleifend non
            molestie vel, varius eget magna. Nullam tortor lorem, sagittis at
            turpis et, pulvinar consequat felis. Nunc non nisl lobortis felis
            pretium semper. Maecenas egestas nunc at molestie lacinia. Sed non
            maximus tellus. Nullam tortor lorem, sagittis at turpis et, pulvinar
            consequat felis. Nunc non nisl lobortis felis pretium semper.Nullam
            tortor lorem, sagittis at turpis et, pulvinar consequat felis. Nunc
            non nisl lobortis felis pretium semper.Nullam tortor lorem, sagittis
            at turpis et, pulvinar consequat felis. Nunc non nisl lobortis felis
            pretium semper.Nullam tortor lorem, sagittis at turpis et, pulvinar
            consequat felis. Nunc non nisl lobortis felis pretium semper.Nunc
            non nisl lobortis felis pretium semper.Nullam tortor lorem, sagittis
            at turpis et, pulvinar consequat felis
          </Card>
        </Box>
        <Grid columns="1" gap="2" width="auto" className="p-4">
          <Box maxWidth="240px">
            <Card size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 100,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>This is the title</Strong>
              </Text>
              <Badge color="gray" variant="soft" radius="full" size="1">
                8 min read
              </Badge>
              <Text as="span" size="1" className="mx-2">
                27 Apr 2023
              </Text>
            </Card>
          </Box>
          <Box maxWidth="240px">
            <Card size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 100,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>This is the title</Strong>
              </Text>
              <Badge color="gray" variant="soft" radius="full" size="1">
                8 min read
              </Badge>
              <Text as="span" size="1" className="mx-2">
                27 Apr 2023
              </Text>
            </Card>
          </Box>
          <Box maxWidth="240px">
            <Card size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 100,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>This is the title</Strong>
              </Text>
              <Badge color="gray" variant="soft" radius="full" size="1">
                8 min read
              </Badge>
              <Text as="span" size="1" className="mx-2">
                27 Apr 2023
              </Text>
            </Card>
          </Box>
        </Grid>
      </Flex>
    </div>
  );
};
export default page;
//TODO : Create Article Route
