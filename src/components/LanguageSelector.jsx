import React from 'react';
import { Box, Text, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { LANGUAGES_VERSIONS } from "../constants.js";
import { color } from 'framer-motion';

const languages = Object.entries(LANGUAGES_VERSIONS);

const LanguageSelector = ({language, onSelect}) => {
  return (
    <Box>
      <Text mb={2} fontSize="lg">Language</Text>

      <Menu>
        <MenuButton mb={4} as={Button} variant="outline" size="sm">
          {language}
        </MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem key={lang} onClick={() => onSelect(lang)} color={lang === language ? "blue.400" : ""} bg={lang === language ? "gray.900" : "transparent"} _hover={{color: "blue.400", bg: "gray.900"}}>
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                {version}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
