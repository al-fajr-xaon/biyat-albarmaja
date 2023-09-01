"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const path_1 = __importDefault(require("path"));
const app = electron_1.default.app;
app.once("ready", () => {
    const main_window = new electron_1.default.BrowserWindow({
        width: 1800,
        height: 1000,
        frame: false,
        autoHideMenuBar: true,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false
        }
    });
    main_window.loadFile(path_1.default.join(__dirname, "main.html")).then(() => {
        console.log("Main window loaded successfully");
    }).catch((e) => {
        console.error("Failed to load main window", e);
        process.exit(1);
    });
    main_window.once("ready-to-show", () => {
        main_window.show();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUNoQyxnREFBd0I7QUFFeEIsTUFBTSxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxHQUFHLENBQUM7QUFFekIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ25CLE1BQU0sV0FBVyxHQUFHLElBQUksa0JBQVEsQ0FBQyxhQUFhLENBQUM7UUFDM0MsS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxLQUFLO1FBQ1osZUFBZSxFQUFFLElBQUk7UUFDckIsSUFBSSxFQUFFLElBQUk7UUFDVixjQUFjLEVBQUU7WUFDWixlQUFlLEVBQUUsSUFBSTtZQUNyQixXQUFXLEVBQUUsS0FBSztZQUNsQixnQkFBZ0IsRUFBRSxLQUFLO1NBQzFCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=