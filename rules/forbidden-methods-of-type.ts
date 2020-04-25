import * as ts from "typescript";
import {
  TSESTree,
  AST_NODE_TYPES,
  ESLintUtils,
  ASTUtils,
} from "@typescript-eslint/experimental-utils";

import chalk from "chalk";
export const createRule = ESLintUtils.RuleCreator(
  (name) => `yuanjian's experimental typescript-eslint-rules`
);

const enum ComparisonType {
  /** Do no assignment comparison */
  None,
  /** Use the receiver's type for comparison */
  Basic,
  /** Use the sender's contextual type for comparison */
  Contextual,
}

export default createRule({
  name: "forbidden-methods-of-type",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows assigning any to variables and properties",
      category: "Possible Errors",
      recommended: false,
      requiresTypeChecking: true,
    },
    messages: {
      noJqueryMethod: "Please do not use $(...).{{method}}",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { program, esTreeNodeToTSNodeMap } = ESLintUtils.getParserServices(
      context
    );
    const checker = program.getTypeChecker();

    const sourceCode = context.getSourceCode();
    const printer = (n: TSESTree.Node) => sourceCode.getText(n);
    const filePath = context.getFilename();

    return {
      [AST_NODE_TYPES.CallExpression](node: TSESTree.CallExpression): void {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier
        ) {
          const obj = node.callee.object;
          const prop = node.callee.property;
          const objTsNode = esTreeNodeToTSNodeMap.get(obj);
          const objType = checker.getTypeAtLocation(objTsNode);
          if (objType.symbol) {
            // console.log(objType.symbol.name);
            if (objType.symbol.members) {
              //@ts-ignore
              const propDef = objType.symbol.members.get(prop.name);
              // console.log('propDef', propDef?.valueDeclaration.kind);
            }
          }
          // console.log(
          //   chalk.bgRed(checker.typeToString(objType)),
          //   chalk.bgYellow(printer(obj)),
          //   chalk.bgGreen(prop.name)
          // );

          if (checker.typeToString(objType) === "JQuery") {
            if (["next", "prev", "parseInt"].includes(prop.name)) {
              context.report({
                node,
                messageId: "noJqueryMethod",
                data: {
                  method: prop.name,
                },
              });
            }
          }
        }
      },
    };
  },
});
