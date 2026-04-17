declare module "*.module.css" {
  const classes: {
    timeTableWrapper: string;
    day: string;
    dayTitle: string;
    hour: string;
    event: string;
    eventInfo: string;
    [keyof: string]: string;
  };
  export default classes;
}
