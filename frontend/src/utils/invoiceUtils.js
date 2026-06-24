import { STATUS_STYLES } from "../constants/salesConstants";

export const getStatusStyle = (status) =>
    STATUS_STYLES[status] ?? STATUS_STYLES.DEFAULT;
