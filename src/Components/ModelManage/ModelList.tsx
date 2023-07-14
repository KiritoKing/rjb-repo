import { List, ListItem, Radio, RadioGroup, Typography } from "@mui/joy";
import React from "react";

interface IProps {
  options?: IModelInfo[];
}

const ModelList: React.FC<IProps> = ({ options }) => {
  return (
    <RadioGroup
      name="models"
      onChange={(e) => {
        console.log(e.target.value);
      }}
    >
      <List
        sx={{
          minWidth: 240,
          "--List-gap": "0.5rem",
          "--ListItem-paddingY": "1rem",
          "--ListItem-radius": "8px",
          "--ListItemDecorator-size": "32px",
        }}
      >
        {options?.length && options.length > 0 ? (
          options.map(({ name, id }) => {
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
          })
        ) : (
          <ListItem sx={{ m: "20px auto" }}>
            <Typography>暂无可用模型</Typography>
          </ListItem>
        )}
        {}
      </List>
    </RadioGroup>
  );
};

export default ModelList;
