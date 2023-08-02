import cx from "classnames";
import Calendar from "react-calendar";
import { useBoolean } from "react-use";
import { ECongressCalendarItemType, GetCongressCalendarComponent } from "../../graphql/urql-codegen/code";

export const CalendarComponent = () => {
  const [senateActive, setSenateActive] = useBoolean(true);
  const [houseActive, setHouseActive] = useBoolean(true);
  const [bothActive, setBothActive] = useBoolean(true);
  const [holidayActive, setHolidayActive] = useBoolean(true);
  return (
    <GetCongressCalendarComponent>
      {({ data }) => {
        const congressCalendarItems = (data?.getCongressCalendar || []).reduce<Record<string, ECongressCalendarItemType>>(
          (prev, { type, date }) => {
            prev[date] = type;
            return prev;
          },
          {}
        );
        return (
          <div className="rounded bg-white p-1">
            <Calendar
              calendarType="US"
              tileClassName={({ date }) => {
                const type = congressCalendarItems[date.toISOString()];
                return cx({
                  "bg-[#e1eb87]": senateActive && type === ECongressCalendarItemType.Senate,
                  "bg-[#8791eb]": houseActive && type === ECongressCalendarItemType.House,
                  "bg-[#98eb87]": bothActive && type === ECongressCalendarItemType.Both,
                  "bg-[#eb8787]": holidayActive && type === ECongressCalendarItemType.Holiday,
                });
              }}
            />
            <div className="mb-1 mt-2 flex justify-around">
              {[
                { colorClass: senateActive ? "bg-[#e1eb87]" : "", label: "Senate", onClick: setSenateActive },
                { colorClass: houseActive ? "bg-[#8791eb]" : "", label: "House", onClick: setHouseActive },
                { colorClass: bothActive ? "bg-[#98eb87]" : "", label: "Both", onClick: setBothActive },
                { colorClass: holidayActive ? "bg-[#eb8787]" : "", label: "Holiday", onClick: setHolidayActive },
              ].map(({ colorClass, label, onClick }, index) => (
                <div key={index} className={`flex cursor-pointer items-center rounded p-1 text-sm ${colorClass}`} onClick={onClick}>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </GetCongressCalendarComponent>
  );
};
