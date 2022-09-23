import { Accordion, Box, Button, createStyles, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import { openModal } from '@mantine/modals'
import CreateLocation from './components/modals/CreateLocation'
import { teleportToLocation, useLocation } from '../../../../atoms/location'
import { TbList } from 'react-icons/tb'
import HeaderGroup from '../../components/HeaderGroup'
import LocationSearch from './components/LocationSearch'
import { setClipboard } from '../../../../utils/setClipboard'
import { useEffect, useState } from 'react'
import RenameLocation from './components/modals/RenameLocation'

const Locations: React.FC = () => {
  const locations = useLocation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);
  }, [copied, setCopied]);

  return (
    <>
      <Paper p="md">
        <Stack>
          <HeaderGroup header="Existing Locations" Icon={TbList} />
          <LocationSearch />
          <Button
            uppercase
            variant="light"
            onClick={() =>
              openModal({
                title: 'Create location',
                size: 'xs',
                children: <CreateLocation />,
              })
            }
          >
            Create location
          </Button>
          <ScrollArea style={{ height: 555 }} scrollbarSize={0}>
            <Stack>
              {locations.map((location, index) => (
                <Accordion>
                  <Accordion.Item value={location.name}>
                    <Accordion.Control>
                      <Stack spacing={0}>
                       <Text size="xl">{location.name}</Text>
                       <Text size="xs">Coords: {location.x}, {location.y}, {location.z}</Text>
                     </Stack>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Group grow spacing="xs">
                        <Button
                          variant="outline"
                          color="orange"
                          size="xs"
                          onClick={() => {
                            teleportToLocation({ x: location.x, y: location.y, z: location.z, heading: location.heading })
                          }}
                        >
                          Teleport
                        </Button>
                        <Button
                          variant="outline"
                          color="orange"
                          size="xs"
                          onClick={() => {
                            openModal({
                              title: 'Rename location',
                              children: <RenameLocation defaultName={location.name} />,
                              size: 'xs',
                            });
                          }}
                        >
                          Rename
                        </Button>
                        <Button
                          variant="outline"
                          color={copied ? 'teal' : 'orange'}
                          size="xs"
                          onClick={() => {
                            setClipboard(location.x + ', ' + location.y + ', ' + location.z);
                            setCopied(true);
                          }}
                        >
                          {copied ? 'Copied' : 'Copy'} coords
                        </Button>
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
                // <Box
                //   className={classes.location}
                //   key={`location-${index}`}
                //   onClick={() => setSelectedLocationIndex(location.name)}
                // >
                //   <Stack spacing="xl">
                //     <Stack spacing={0}>
                //       <Text size="xl">{location.name}</Text>
                //       <Text size="xs">
                //         Coords: {location.x}, {location.y}, {location.z}
                //       </Text>
                //     </Stack>
                //   </Stack>
                // </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Paper>
    </>
  );
};

export default Locations

function setCopied(arg0: boolean) {
  throw new Error('Function not implemented.')
}

