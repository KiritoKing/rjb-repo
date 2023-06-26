import { List, ListItem, Radio, RadioGroup } from "@mui/joy";
import React from "react";

interface IProps {
  options: IModelInfo[];
}

const ModelList: React.FC<IProps> = ({ options }) => {
  return (
    <RadioGroup name="models">
      <List
        sx={{
          minWidth: 240,
          "--List-gap": "0.5rem",
          "--ListItem-paddingY": "1rem",
          "--ListItem-radius": "8px",
          "--ListItemDecorator-size": "32px",
        }}
      >
        {options.map(({ name, description, id }) => {
          return (
            <ListItem
              variant="outlined"
              key={id}
              sx={{ boxShadow: "sm", bgcolor: "background.body" }}
            >
              <Radio
                overlay
                value={id}
                label={name}
                sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: "2px solid",
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </RadioGroup>
  );
};

export default ModelList;
