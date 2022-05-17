import {
    ProcessingLookupJson,
    ProcessingReplace,
    ProcessingSchemaSteps,
    ProcessingStringFormat,
    ProcessingSwitch, ProcessingSwitchCondition, ProcessingSwitchConditionField
} from "./CraftingTypes";
import {get, head} from "lodash";

type StepInput = null | undefined | ProcessingSchemaSteps[]


export function handleProcessing(fieldData: any, processingSteps: StepInput, json: object, depth: number = 0) {
    let currentData = fieldData;
    if (processingSteps !== undefined && processingSteps !== null) {
        processingSteps
            .forEach(step => {
                if (shouldRunStep(step, currentData, depth)) {
                    if (step.action === "map") { //TODO recode if-else blocks as map of key:function
                        currentData = mapData(currentData, step.processing, json, depth)
                    } else if (step.action === "characters") {
                        currentData = stringToCharacterArray(currentData);
                    } else if (step.action === "lookup:json") {
                        currentData = lookupFieldFromJson(step as ProcessingLookupJson, currentData, json);
                    } else if (step.action === "replace") {
                        currentData = replaceValue(step as ProcessingReplace, currentData)
                    } else if (step.action === "format") {
                        currentData = formatIntoString(step as ProcessingStringFormat, currentData);
                    } else if(step.action === "switch") {
                        currentData = switchLogic(step as ProcessingSwitch, currentData, json, depth);
                    }
                    else {
                        throw new Error(`[${depth}] Unknown processing step ${step.action}`);
                    }
                }
            });
    }
    return currentData;
}

function switchLogic(step: ProcessingSwitch, currentData: any, json: object, depth: number) {

    const pathToRun: ProcessingSwitchCondition | undefined = head(step.paths.filter(path => {
        if(path.condition === "contains") {
            const fieldBasedPath = path as ProcessingSwitchConditionField;
            const value = get(currentData, fieldBasedPath.field);
            return value !== null && value !== undefined;
        }
        else if(path.condition === "default") {
           return true;
        }
        throw new Error(`[${depth}] Unknown processing switch condition ${path.condition}`);
    }));

    if(pathToRun !== null && pathToRun !== undefined) {
        return handleProcessing(currentData, pathToRun.processing, json, depth);
    }
    throw new Error(`[${depth}] Failed to match a condition for switch, add a default`);
}

function shouldRunStep(step: ProcessingSchemaSteps, currentData: any, depth: number) {
    if (step.run !== null && step.run !== undefined) {
        if (step.run === "definedOnly") {
            return currentData !== null && currentData !== undefined;
        } else {
            throw new Error(`[${depth}] Unknown run condition ${step.run}`);
        }
    }
    return true;
}

function formatIntoString(step: ProcessingStringFormat, currentData: any) {
    if (typeof currentData === 'object') {
        let formattedText = step.format;
        step.data.forEach((entry, index) => {
            const data = get(currentData, entry);
            formattedText = formattedText.replaceAll(`{${index}}`, data);
        })
        return formattedText;
    } else {
        throw new Error(`Can't format unknown data type ${currentData}`);
    }
}

function replaceValue(step: ProcessingReplace, currentData: any) {
    if (currentData === step.match) {
        return step.insert;
    }
    //TODO add regex support
    //TODO add equality checks for nesting
    return currentData;
}

function lookupFieldFromJson(step: ProcessingLookupJson, currentData: any, json: object) {

    if (typeof currentData === 'string') {
        if (step.arg === "entry") {
            return get(json, `${step.field}.${currentData}`);
        } else {
            throw Error(`lookup:json unknown arg type of '${step.arg}'`);
        }
    } else {
        throw Error("lookup:json requires CurrenData to be a string", currentData); //TODO output step so we can track nesting
    }
}

function stringToCharacterArray(currentData: any) {
    if (typeof currentData === 'string') {
        return Array.from(currentData);
    } else {
        throw Error("CurrenData is not a string", currentData); //TODO output step so we can track nesting
    }
}

function mapData(currentData: any, processingSteps: StepInput, json: object, depth: number = 0) {
    if (Array.isArray(currentData)) {
        return currentData.map(entry => {
            return handleProcessing(entry, processingSteps, json, depth + 1);
        });
    } else {
        console.error("map -> currentData", currentData)
        throw Error(`"map[${depth}] requires current data to be an array"`);
    }
}