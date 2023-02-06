import { children, elements, ElementViewTemplate, html, ref, slotted, when } from "@microsoft/fast-element";
import { endSlotTemplate, startSlotTemplate, staticallyCompose, TreeItemOptions } from "@microsoft/fast-foundation";
import type { FASTTreeItem } from "@microsoft/fast-foundation";
import { DesignSystem } from "../../design-system.js";

/**
 * Key for {@link DesignSystem} `statics` registration for the tree item expand collapse icon.
 */
export const TreeItemExpandCollapseIconKey: string = "tree-item-expand-collapse-icon";

// TODO: Temporary copy of template until https://github.com/microsoft/fast/pull/6286/

/**
 * Default Tree Item template, {@link @microsoft/fast-foundation#treeItemTemplate}.
 */
export const template: (ds: DesignSystem) => ElementViewTemplate<FASTTreeItem> =
    (ds: DesignSystem) => {
        // treeItemTemplate(
        const options: TreeItemOptions = {
            expandCollapseGlyph: ds.statics.get(TreeItemExpandCollapseIconKey),
        };

        return html<FASTTreeItem>`
            <template
                role="treeitem"
                slot="${(x) => (x.isNestedItem() ? "item" : void 0)}"
                tabindex="-1"
                aria-expanded="${(x) => (x.childItems && x.childItemLength > 0 ? x.expanded : void 0)}"
                aria-selected="${(x) => x.selected}"
                aria-disabled="${(x) => x.disabled}"
                @focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
                @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
                ${children({
                    property: "childItems",
                    filter: elements(),
                })}
            >
                <div class="control" part="control">
                    ${when(
                        (x) => x.childItems && x.childItemLength > 0,
                        html<FASTTreeItem>`
                            <div
                                aria-hidden="true"
                                class="expand-collapse-button"
                                part="expand-collapse-button"
                                @click="${(x, c) => x.handleExpandCollapseButtonClick(c.event as MouseEvent)}"
                                ${ref("expandCollapseButton")}
                            >
                                <slot name="expand-collapse-icon">
                                    ${staticallyCompose(options.expandCollapseGlyph)}
                                </slot>
                            </div>
                        `
                    )}
                    ${startSlotTemplate(options)}
                    <span class="content" part="content">
                        <slot></slot>
                    </span>
                    ${endSlotTemplate(options)}
                </div>
                ${when(
                    (x) => x.childItems && x.childItemLength > 0 && x.expanded,
                    html<FASTTreeItem>`
                        <div role="group" class="items" part="items">
                            <slot name="item" ${slotted("items")}></slot>
                        </div>
                    `
                )}
            </template>
        `;
    };
