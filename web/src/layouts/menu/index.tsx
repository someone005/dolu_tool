import { AppShell, Box, createStyles, Group, Header, Title, Transition } from '@mantine/core';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/home/home';
import Locations from './views/locations';
import { menuVisibilityAtom } from '../../atoms/visibility';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useExitListener } from '../../hooks/useExitListener';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Location, locationsAtom } from '../../atoms/location';
import { GiTeleport } from 'react-icons/gi';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 1280,
    height: 768,
    // backgroundColor: theme.colors.dark[8],
    borderRadius: theme.radius.sm,
    color: theme.colors.dark[1],
  },
}));

const Menu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useRecoilState(menuVisibilityAtom);
  const setLocations = useSetRecoilState(locationsAtom);

  useNuiEvent('setMenuVisible', (data: { locations: Location[] }) => {
    setVisible(true);
    setLocations(data.locations);
  });

  useNuiEvent('setLocationDatas', (data: { locations: Location[] }) => {
    setLocations(data.locations);
  });

  useExitListener(setVisible);

  return (
    <Transition transition="slide-right" mounted={visible}>
      {(style) => (
        <Box sx={{ position: 'absolute', top: '2%', left: '2%' }} style={style} className={classes.wrapper}>
          <AppShell
            padding="md"
            fixed={false}
            styles={(theme) => ({
              root: {
                maxWidth: 600,
              },
              main: {
                backgroundColor: theme.colors.dark[8],
                width: 1024,
                height: 768,
                maxWidth: 600,
                borderTopRightRadius: theme.radius.sm,
                borderBottomRightRadius: theme.radius.sm,
              },
            })}
            navbar={<Nav />}
            header={
              <Header height={60}>
                <Group sx={{ height: '100%', borderRadius: '5px' }} px={20} position='apart'>
                  <Title order={3}>Dolu Mapping Tool v4</Title>
                  <GiTeleport size={24} />
                </Group>
              </Header>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/locations" element={<Locations />} />
            </Routes>
          </AppShell>
        </Box>
      )}
    </Transition>
  );
};

export default Menu;
