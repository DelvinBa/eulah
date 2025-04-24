import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function useDateFormat() {
  const formatDate = (dateString: string | number | Date) => {
    return format(new Date(dateString), "d. MMMM yyyy", { locale: de });
  };

  return { formatDate };
}
