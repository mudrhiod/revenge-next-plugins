import { ActionSheetActionCreators } from "@revenge-mod/discord/actions";
import { before, after } from "@revenge-mod/patcher";
import { findInReactFiber } from "@revenge-mod/utils/react";
import { createElement } from "react";

import MessageCard from "../components/MessageCard";

export default () => [
    before(ActionSheetActionCreators, "openLazy", (args) => {
        const [component, key, msg] = args;
        const message = msg?.message;

        if (key !== "MessageLongPressActionSheet" || !message) {
            return args;
        }

        component.then((instance: any) => {
            const unpatch = after(instance, "default", (component: any) => {
                unpatch();

                const actionSheet = findInReactFiber(
                    component,
                    (x: any) => x?.props && "header" in x.props
                );

                if (actionSheet) {
                    const header = actionSheet.props.header;
                    actionSheet.props.header = createElement(MessageCard, { message, header });
                }

                return component;
            });
        });

        return args;
    })
]